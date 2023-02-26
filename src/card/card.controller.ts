import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto, EditCardDto } from './dto';

@Controller('folders/:folderId/decks/:deckId/card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCards(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Query('search') query: string,
  ) {
    if (!query) {
      return this.cardService.getCards(deckId);
    } else {
      return this.cardService.searchCardsByName(deckId, query);
    }
  }

  @Get(':id')
  getCardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) cardId: number,
  ) {
    return this.cardService.getCardById(deckId, cardId);
  }

  @Post()
  createCard(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardService.createCard(deckId, dto);
  }

  @Patch(':id')
  editCardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) cardId: number,
    @Body() dto: EditCardDto,
  ) {
    return this.cardService.editCardById(deckId, cardId, dto);
  }

  @Delete(':id')
  deleteCardById(
    @Param('deckId', ParseIntPipe) deckId: number,
    @Param('id', ParseIntPipe) cardId: number,
  ) {
    return this.cardService.deleteCardById(deckId, cardId);
  }
}
