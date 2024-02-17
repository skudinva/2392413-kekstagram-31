const dicts = {
  descriptions: [
    'Котики',
    'Один мой день',
    'Просто красивая картинка',
    'На улице',
    'Красиво?',
    'Завтрак',
    'Природа',
    'Слетал побырому',
    'На море',
    'Батонюсь',
    'Зацените',
    'Такую вот фиговину увидел',
    'Без описания'
  ],
  messages: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ],
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ],
};

let commentId = 1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

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
      commentId++,
      `img/avatar-${getRandomInteger(1, 6)}.svg`,
      getRandomArrayElement(dicts.messages),
      getRandomArrayElement(dicts.names)
    )
  );

const createPosts = (postsCount, maxComments) =>
  Array.from({ length: postsCount }, (vl, key) =>
    createPost(
      key,
      `photos/${key}.jpg`,
      getRandomArrayElement(dicts.descriptions),
      getRandomInteger(15, 200),
      createComments(maxComments)
    )
  );

const posts = createPosts(25, 30);

// eslint-disable-next-line no-console
console.debug(posts);
