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
import { DeckService } from './deck.service';
import { CreateDeckDto, EditDeckDto } from './dto';

@Controller('folders/:folderId/decks')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get()
  getDecks(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Query('search') query: string,
  ) {
    if (!query) {
      return this.deckService.getDecks(folderId);
    } else {
      return this.deckService.searchDeckByName(folderId, query);
    }
  }

  @Get(':id')
  getDecksById(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Param('id', ParseIntPipe) deckId: number,
  ) {
    return this.deckService.getDecksById(folderId, deckId);
  }

  @Post()
  createDeck(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Body() dto: CreateDeckDto,
  ) {
    return this.deckService.createDeck(folderId, dto);
  }

  @Patch(':id')
  editDeckById(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Param('id', ParseIntPipe) deckId: number,
    @Body() dto: EditDeckDto,
  ) {
    return this.deckService.editDeckById(folderId, deckId, dto);
  }

  @Delete(':id')
  deleteDeckById(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Param('id', ParseIntPipe) deckId: number,
  ) {
    return this.deckService.deleteDeckById(folderId, deckId);
  }
}
