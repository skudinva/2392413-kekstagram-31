import { createPosts } from './posts';
import { drawThumbnails } from './draw-thumbnails';
import { initUploadPicture } from './upload-picture';

const posts = createPosts(25, 30);
drawThumbnails(posts);
initUploadPicture();
