import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDeckDto, EditDeckDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  getDecks(folderId: number) {
    return this.prisma.deck.findMany({
      where: {
        folderId,
      },
    });
  }

  getDecksById(folderId: number, deckId: number) {
    return this.prisma.deck.findFirst({
      where: {
        id: deckId,
        folderId,
      },
    });
  }

  async searchDeckByName(folderId: number, query: string) {
    return await this.prisma.deck.findMany({
      where: {
        folderId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  async createDeck(folderId: number, dto: CreateDeckDto) {
    const deck = await this.prisma.deck.create({
      data: {
        folderId,
        ...dto,
      },
    });
    return deck;
  }

  async editDeckById(folderId: number, deckId: number, dto: EditDeckDto) {
    const deck = await this.prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!deck || deck.folderId !== folderId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.deck.update({
      where: {
        id: deckId,
      },
      data: { ...dto },
    });
  }

  async deleteDeckById(folderId: number, deckId: number) {
    const deck = await this.prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!deck || deck.folderId !== folderId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.deck.delete({
      where: {
        id: deckId,
      },
    });
  }
}
