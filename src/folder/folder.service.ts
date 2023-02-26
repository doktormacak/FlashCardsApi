import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFolderDto, EditFolderDto } from './dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  getFolders(userId: number) {
    return this.prisma.folder.findMany({
      where: {
        userId,
      },
    });
  }

  getFolderById(userId: number, folderId: number) {
    return this.prisma.folder.findFirst({
      where: {
        userId,
        id: folderId,
      },
    });
  }

  async searchFoldersByName(userId: number, query: string) {
    return await this.prisma.folder.findMany({
      where: {
        userId,
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  async createFolder(userId: number, dto: CreateFolderDto) {
    const folder = await this.prisma.folder.create({
      data: {
        userId,
        ...dto,
      },
    });
    return folder;
  }

  async editFolderById(userId: number, folderId: number, dto: EditFolderDto) {
    const folder = await this.prisma.folder.findUnique({
      where: {
        id: folderId,
      },
    });

    if (!folder || folder.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: { ...dto },
    });
  }

  async deleteFolderById(userId: number, folderId: number) {
    const folder = await this.prisma.folder.findUnique({
      where: {
        id: folderId,
      },
    });

    if (!folder || folder.userId !== userId)
      throw new ForbiddenException('Access denied');

    await this.prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  }
}
