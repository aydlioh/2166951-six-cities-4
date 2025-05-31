import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../../user/entities/user.entity.js';
import { OfferEntity } from '../../offer/entities/offer.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
    timestamps: true,
  },
})
export class FavoriteEntity {
  @prop({ ref: () => UserEntity, required: true })
  public userId: Ref<UserEntity>;

  @prop({ ref: () => OfferEntity, required: true })
  public offerId: Ref<OfferEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
