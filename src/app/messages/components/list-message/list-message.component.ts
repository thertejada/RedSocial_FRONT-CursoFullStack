import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../../models/message.model';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../models/user.model';
import {ReactionTypeEnum} from '../../../models/enums/ReactionTypeEnum';
import {Reaction} from '../../../models/reaction.model';
import {MessageReactions} from '../../../models/message-reactions.model';
import {Router} from '@angular/router';

@Component({
  selector: 'message-list',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {
  user: User;
  // Lista total mensajes
  totalMessages: Array<MessageReactions>;
  private myMessages: Array<Message> = Array<Message>();
  private myFriendsMessages: Array<Message> = Array<Message>();
  // Reacciones <ID mensaje, total de reacciones>
  totalReactionLike: Map<number, number> = new Map<number, number>();
  totalReactionHate: Map<number, number> = new Map<number, number>();
  totalReactionLove: Map<number, number> = new Map<number, number>();


  constructor(private messageService: MessagesService,
              private loginService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.userLogin().subscribe(
      value => this.user = value
    );
    this.getMensajes();
    this.messageService.updateLists$().subscribe(
      (value: boolean) => {
        if (value) {
          this.getMensajes();
          this.messageService.updateListsValue(false);
        }
      }
    );
  }

  private getMensajes() {
    if (this.router.url == '/profile') {
      this.getMessagesUser();
    } else {
      this.getFriendsMessages();
      this.getMessagesUser();
    }
  }

  private getFriendsMessages() {
    this.myFriendsMessages = new Array<Message>();
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id !== undefined) {
          this.myFriendsMessages = Array<Message>();
          this.messageService.getAllMessagesUserFriend(user.id).subscribe(
            (friendsMessages: Array<Message>) => {
              //console.log(friendsMessages);
              this.myFriendsMessages = friendsMessages;
            },
            error => {
              if (error.status == 404) {
                console.debug('No hay mensajes de amigos');
              }
            },
            () => this.crearTotalMensajes()
          );
        }
      }
    );
  }


  getMessagesUser() {
    this.myMessages = new Array<Message>();
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id !== undefined) {
          this.messageService.getAllMessagesUser(user.id).subscribe(
            (myData: Array<Message>) => {
              //console.log(myData);
              this.myMessages = myData;
            },
            error => {
              if (error.status == 404) {
                console.debug('No hay mensajes del usuario');
              }
            },
            () => {
              this.crearTotalMensajes();
            }
          );
        }
      }
    );
  }

  crearTotalMensajes() {
    this.totalReactionLike = new Map<number, number>();
    this.totalReactionHate = new Map<number, number>();
    this.totalReactionLove = new Map<number, number>();
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id !== undefined) {
          this.totalMessages = this.filtrarFechaDesc(Object.create(this.myMessages.concat(this.myFriendsMessages)));
          this.totalMessages.forEach(message => this.cargarReactions(message));
        }
      }
    );
  }

  filtrarFechaDesc(message: Array<MessageReactions>) {
    return message.sort((a, b) =>
      new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()).reverse();
  }

  deleteMessageUser(message: Message) {
    this.messageService.deleteMessage(message.id).subscribe(
      value => {
        this.messageService.updateListsValue(true);
      },
      error => console.error(error),
      () => {
        console.debug('Mensaje borrado');
      }
    );
  }

  // Reacciones

  private postReaction(type: ReactionTypeEnum, message: MessageReactions) {
    let reaction = new Reaction();
    reaction.type = type;
    reaction.user = this.loginService.getValueUserLogin();
    this.messageService.postReactionMessage(message.id, reaction).subscribe(
      () => '',
      error => console.error(error),
      () => this.cargarReactions(message) //this.messageService.updateListsValue(true)
    );
  }

  cargarReactions(message: Message) {
    this.messageService.getAllMessagesReaction(message.id).subscribe(
      (reactions: Array<Reaction>) => {
        // Establecer las reacciones al mensaje para la comprobación de si es mia
        this.totalMessages.find(m => m.id == message.id).reactions = reactions;

        this.totalReactionLike.set(message.id, reactions.filter(r => r.type.toString() == ReactionTypeEnum.LIKE).length);
        this.totalReactionHate.set(message.id, reactions.filter(r => r.type.toString() == ReactionTypeEnum.HATE).length);
        this.totalReactionLove.set(message.id, reactions.filter(r => r.type.toString() == ReactionTypeEnum.LOVE).length);
        if (this.checkIfIsMyReaction(reactions, 'LIKE')) {
          this.setMyReaction(message, 'LIKE');
        } else if (this.checkIfIsMyReaction(reactions, 'LOVE')) {
          this.setMyReaction(message, 'LOVE');
        } else if (this.checkIfIsMyReaction(reactions, 'HATE')) {
          this.setMyReaction(message, 'HATE');
        } else {
          this.setMyReaction(message, '');
        }
      },
      error => {
        console.debug('No hay reacciones del mensaje: '.concat(message.id.toString()).concat(' - ').concat(message.user.user));
        this.totalReactionLike.set(message.id, 0);
        this.totalReactionHate.set(message.id, 0);
        this.totalReactionLove.set(message.id, 0);
        this.setMyReaction(message, '');
      }
    );
  }

  /**
   * Establecemos 'myReaction' del mensaje en 'totalMessages' para saber de qué tipo es
   * nuestra reacción en el html. Si no tenemos ninguna reacción el type está vacío
   */
  private setMyReaction(message: Message, type: string) {
    this.totalMessages.find(m => m.id == message.id).myReaction = type;
  }

  /**
   * Comprobar si el array de reacciones del mensaje tiene alguna nuestra
   */
  private checkIfIsMyReaction(reactionsOfMessage: Array<Reaction>, type: string): boolean {
    if (reactionsOfMessage != undefined) {
      return reactionsOfMessage.find(r => r.user.id == this.user.id && r.type.toString() == type) != null;
    }
  }

  postLike(message: MessageReactions) {
    this.postReaction(ReactionTypeEnum.LIKE, message);
  }

  postHate(message: MessageReactions) {
    this.postReaction(ReactionTypeEnum.HATE, message);
  }

  postLove(message: MessageReactions) {
    this.postReaction(ReactionTypeEnum.LOVE, message);
  }
}
