import {
  Body,
  Controller,
  Delete,
  Injectable,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CreateProgramRequestDto } from '../commands/create-program/create-program-request.dto';
import { CreateProgramCommand } from '../commands/create-program/create-program.command';
import { UpdateProgramRequestDto } from '../commands/update-program/update-program-request.dto';
import { UpdateProgramCommand } from '../commands/update-program/update-program.command';
import { DeleteProgramCommand } from '../commands/delete-program/delete-program.command';

// add internal guard
@ApiTags('internal programs apis')
@Injectable()
@Controller('programs')
export class InternalProgramController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Version('1')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProgramRequestDto })
  async create(
    @Body() data: CreateProgramRequestDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.commandBus.execute(
      new CreateProgramCommand({
        ...data,
        image,
      }),
    );
  }

  @Patch(':id')
  @Version('1')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProgramRequestDto })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProgramRequestDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    await this.commandBus.execute(
      new UpdateProgramCommand(id, {
        ...data,
        image,
      }),
    );
  }

  @Delete(':id')
  @Version('1')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteProgramCommand(id));
  }
}
