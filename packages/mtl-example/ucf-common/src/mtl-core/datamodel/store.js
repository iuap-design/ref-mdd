
import { create } from 'mini-store';

export default function (meta) {
    return create({
        meta,
        count: 0
    });
}
