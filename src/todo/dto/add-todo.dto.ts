// import {Length, MinLength} from "class-validator";
// import {descriptionErrorMessage, nameErrorMessage} from "../../common/constants";

export class AddTodoDto{

    // @MinLength(10,{
    //     message : nameErrorMessage
    // })
    name : string

    // @Length(3,10,{
    //     message : descriptionErrorMessage
    // })
    description : string

}
