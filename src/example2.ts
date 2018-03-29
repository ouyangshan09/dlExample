/**
 * Created by Ouyang on 2018/3/29.
 * 项目例子2
 * @author Ouyang
 */
import { Scalar } from 'deeplearn';

async function fn (): Promise<string> {
    console.log('hello from deeplearn.js!');
    console.log('');
    console.log('you can change this code and run it on the fly.');
    console.log('');

    console.log('and the deeplearn.js library is already linked in under "dl":');
    console.log( await Scalar.new(10).data());
    return '';
}

fn();
