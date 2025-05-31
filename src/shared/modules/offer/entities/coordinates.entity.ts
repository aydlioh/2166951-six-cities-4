import { prop } from '@typegoose/typegoose';
import { Coordinates as CoordinatesType } from '../../../types/offer.js';

export class Coordinates implements CoordinatesType {
  @prop({ required: true, type: Number })
  public latitude!: number;

  @prop({ required: true, type: Number })
  public longitude!: number;
}
