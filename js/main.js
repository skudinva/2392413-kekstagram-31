import { createPosts } from './posts';
import { drawThumbnails } from './draw-thumbnails';

const posts = createPosts(25, 30);
drawThumbnails(posts);
