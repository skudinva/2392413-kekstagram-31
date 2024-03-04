import { drawThumbnails } from './draw-thumbnails';
import { createPosts } from './posts';
import { initUploadPicture } from './upload-picture';

const posts = createPosts(25, 30);
drawThumbnails(posts);
initUploadPicture();
