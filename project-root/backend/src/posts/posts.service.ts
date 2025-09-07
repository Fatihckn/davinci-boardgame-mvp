import { Injectable } from '@nestjs/common';
import { Post } from '../interfaces/post.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'İlk Yazım: Yazılıma Başlamak',
      body: 'Yazılıma nereden başlayacağımı çok düşündüm. Önce HTML öğrendim, sonra JavaScript ile devam ettim...',
    },
    {
      id: 2,
      userId: 1,
      title: 'Frontend mi Backend mi?',
      body: 'Bir yazılımcı olarak ilk kararlardan biri frontend mi yoksa backend mi çalışacağına karar vermek...',
    },
    {
      id: 3,
      userId: 2,
      title: 'Sabah Sporu Yapmanın Önemi',
      body: 'Her sabah spor yapmak güne daha enerjik başlamanıza yardımcı olur. Ben özellikle koşuyu tercih ediyorum...',
    },
    {
      id: 4,
      userId: 2,
      title: 'Sağlıklı Beslenme Alışkanlıkları',
      body: 'Fast food yerine evde yemek yapmak hem daha sağlıklı hem de daha ekonomik bir tercih olabilir...',
    },
    {
      id: 5,
      userId: 3,
      title: 'Kitap Okuma Listem',
      body: 'Bu yıl okumak istediğim kitaplar arasında Suç ve Ceza, Sefiller ve Kürk Mantolu Madonna var...',
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter((post) => post.userId === userId);
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id:
        this.posts.length > 0
          ? Math.max(...this.posts.map((p) => p.id)) + 1
          : 1,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    console.log('Updating post with ID:', id, 'Data:', updatePostDto);
    console.log('Current posts:', this.posts);

    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      console.log('Post not found with ID:', id);
      throw new Error('Post not found');
    }

    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    console.log('Updated post:', this.posts[postIndex]);
    return this.posts[postIndex];
  }

  remove(id: number): void {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    this.posts.splice(postIndex, 1);
  }
}
