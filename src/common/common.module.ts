import {Global, Module} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const uuidProvider = {
    useValue : uuidv4,
    provide : 'UUID'
}


@Global()
@Module({
    providers : [uuidProvider],
    exports : [uuidProvider]
})
export class CommonModule {}
