import productImage from '../assets/product.jpg'

const productImageSrc = productImage.src

export const products = [
  {
    id: 1,
    name: 'Ноутбук MacBook Pro',
    price: 149999,
    discount: 10,
    description: 'Мощный ноутбук для профессиональной работы',
    image: productImageSrc
  },
  {
    id: 2,
    name: 'Смартфон iPhone 15',
    price: 89999,
    discount: 15,
    description: 'Последний флагманский смартфон',
    image: productImageSrc
  },
  {
    id: 3,
    name: 'Наушники AirPods Pro',
    price: 24999,
    description: 'Беспроводные наушники с шумоподавлением',
    image: productImageSrc
  },
  {
    id: 4,
    name: 'Планшет iPad Air',
    price: 59999,
    description: 'Легкий и мощный планшет',
    image: productImageSrc
  },
  {
    id: 5,
    name: 'Смарт-часы Apple Watch',
    price: 34999,
    description: 'Умные часы для фитнеса и связи',
    image: productImageSrc
  },
  {
    id: 6,
    name: 'Игровая консоль PlayStation 5',
    price: 49999,
    discount: 20,
    description: 'Мощная игровая консоль нового поколения',
    image: productImageSrc
  },
  {
    id: 7,
    name: 'Монитор 27"',
    price: 39999,
    description: '4K монитор с высокой частотой обновления',
    image: productImageSrc
  },
  {
    id: 8,
    name: 'Клавиатура механическая',
    price: 12999,
    description: 'RGB механическая клавиатура',
    image: productImageSrc
  },
  {
    id: 9,
    name: 'Мышь беспроводная',
    price: 5999,
    discount: 25,
    description: 'Эргономичная беспроводная мышь',
    image: productImageSrc
  },
  {
    id: 10,
    name: 'Веб-камера 4K',
    price: 15999,
    description: 'Качественная веб-камера для стримов',
    image: productImageSrc
  }
]