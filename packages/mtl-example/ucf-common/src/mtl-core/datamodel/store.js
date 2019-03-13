
import { create } from 'mini-store';

export default function (props) {
    return create({
        ...props,
        count: 0
    });
}
