import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto, EditCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  getCards(deckId: number) {
    return this.prisma.card.findMany({
      where: {
        deckId,
      },
    });
  }

  getCardById(deckId: number, cardId: number) {
    return this.prisma.card.findFirst({
      where: {
        id: cardId,
        deckId,
      },
    });
  }

  async createCard(deckId: number, dto: CreateCardDto) {
    return await this.prisma.card.create({
      data: {
        deckId,
        ...dto,
      },
    });
  }

  async editCardById(deckId: number, cardId: number, dto: EditCardDto) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!card || card.deckId !== deckId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCardById(deckId, cardId) {
    const card = await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!card || card.deckId !== deckId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }
}
