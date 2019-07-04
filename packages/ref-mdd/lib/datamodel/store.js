
import { create } from 'mini-store';

export default function (props) {
    let storeObj =  Object.assign({},props);
    return create(storeObj);
}
