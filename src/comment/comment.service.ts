import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from 'src/entities/comment.entity';
import Episode from 'src/entities/episode.entity';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment> , 
        @InjectRepository(Episode)private episodeRepository: Repository<Episode>) {}

    getAll():Promise<Comment[]> {
      return  this.commentRepository.find()
    }

    async createComment(episode:Episode, ipAddressLocation: string, comment: string): Promise<Comment> {
        const data = { ipAddressLocation, comment };
      
        const result = this.commentRepository.create(data)
        
        episode.comments.push(result)
  
        await this.episodeRepository.save(episode)
        return await this.commentRepository.save(result)
    }


    
}
