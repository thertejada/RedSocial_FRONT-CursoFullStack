import {User} from './user.model';
import {AssistanceStateEnum} from './enums/AssistanceStateEnum';

export class Assistance {
    id: number;
    state: AssistanceStateEnum;
    user: User;

}

