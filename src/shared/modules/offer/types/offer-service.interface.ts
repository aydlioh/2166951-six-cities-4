import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../entities/offer.entity.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';
import { City, DocumentExists } from '../../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findAll(
    count?: number,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]>;
  findById(
    offerId: string,
    userId?: string
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffersByCity(
    city: City,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
