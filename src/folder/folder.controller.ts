import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/decorator';

import { CreateFolderDto, EditFolderDto } from './dto';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {
  constructor(private folderService: FolderService) {}
  @Get()
  getFolders(@GetCurrentUserId() userId: number) {
    return this.folderService.getFolders(userId);
  }

  @Get(':id')
  getFoldersById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) folderId: number,
  ) {
    return this.folderService.getFolderById(userId, folderId);
  }

  @Post()
  createFolder(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateFolderDto,
  ) {
    return this.folderService.createFolder(userId, dto);
  }

  @Patch('id')
  editFolderById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) folderId: number,
    @Body() dto: EditFolderDto,
  ) {
    return this.folderService.editFolderById(userId, folderId, dto);
  }

  @Delete(':id')
  deleteFolderById(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) folderId: number,
  ) {
    return this.folderService.deleteFolderById(userId, folderId);
  }
}
