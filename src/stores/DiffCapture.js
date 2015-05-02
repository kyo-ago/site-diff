import {keys} from '../Actions';
import Capture from './Capture';

export default class _ extends Capture {
  getRegisterKey() {
    return keys.diffCapture;
  }
}