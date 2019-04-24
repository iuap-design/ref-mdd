import _extends from "@babel/runtime/helpers/extends";
import { create } from 'mini-store';
export default function (props) {
  return create(_extends({}, props, {
    count: 0
  }));
}