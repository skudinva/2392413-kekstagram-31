import Dictionary from './data';
import { getRandomArrayElement, getRandomInteger } from './utils';
import { postConfig } from './config';

const createPost = (id, url, description, likes, comments) => ({
  id: id, // число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
  url: url, //строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: description, //строка — описание фотографии. Описание придумайте самостоятельно.
  likes: likes, //число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  comments: comments, // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием
});

const createComment = (id, avatar, message, name) => ({
  id: id, //любое число. Идентификаторы не должны повторяться.
  avatar: avatar, //это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  message: message, //текста комментария
  name: name, //Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами.
});

const createComments = (maxComments) =>
  Array.from({ length: getRandomInteger(0, maxComments) }, () =>
    createComment(
      postConfig.commentId++,
      `img/avatar-${getRandomInteger(postConfig.avatars.min,
        postConfig.avatars.max)
      }.svg`,
      getRandomArrayElement(Dictionary.messages),
      getRandomArrayElement(Dictionary.names)
    )
  );

const createPosts = (postsCount, maxComments) =>
  Array.from({ length: postsCount }, (vl, key) =>
    createPost(
      key + 1,
      `photos/${key + 1}.jpg`,
      getRandomArrayElement(Dictionary.descriptions),
      getRandomInteger(postConfig.likes.min, postConfig.likes.max),
      createComments(maxComments)
    )
  );

export {createPosts};
