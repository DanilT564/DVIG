import mongoose from 'mongoose';

const motors = [
  {
    name: 'Электродвигатель АИР100S4',
    image: '/images/motors/motor1.jpg',
    images: [
      '/images/motors/motor1_1.jpg',
      '/images/motors/motor1_2.jpg',
      '/images/motors/motor1_3.jpg'
    ],
    description: 'Трехфазный асинхронный электродвигатель АИР100S4 мощностью 3 кВт. Предназначен для привода различных производственных механизмов, не требующих регулирования частоты вращения.',
    brand: 'Элдин',
    category: 'electric',
    price: 12500,
    countInStock: 15,
    rating: 4.5,
    numReviews: 12,
    power: 3, // кВт
    weight: 26,
    dimensions: {
      length: 395,
      width: 260,
      height: 260
    },
    voltage: 380,
    rpm: 1500,
    efficiency: 85,
    manufacturer: 'Ярославский электромашиностроительный завод',
    yearOfManufacture: 2023,
    warranty: 24,
    features: [
      'Класс энергоэффективности IE2',
      'Степень защиты IP55',
      'Класс изоляции F',
      'Режим работы S1 (продолжительный)'
    ]
  },
  {
    name: 'Бензиновый двигатель Honda GX390',
    image: '/images/motors/motor2.jpg',
    images: [
      '/images/motors/motor2_1.jpg',
      '/images/motors/motor2_2.jpg'
    ],
    description: 'Надежный четырехтактный бензиновый двигатель Honda GX390. Идеально подходит для профессионального использования в строительном оборудовании, генераторах, насосах и других устройствах.',
    brand: 'Honda',
    category: 'gasoline',
    price: 42000,
    countInStock: 8,
    rating: 4.8,
    numReviews: 23,
    power: 13, // л.с.
    weight: 31.5,
    dimensions: {
      length: 406,
      width: 460,
      height: 448
    },
    rpm: 3600,
    efficiency: 92,
    fuelType: 'gasoline',
    manufacturer: 'Honda Motor Co., Ltd',
    yearOfManufacture: 2023,
    warranty: 36,
    features: [
      'Объем двигателя 389 см³',
      'Система легкого запуска',
      'Воздушное охлаждение',
      'Бесконтактное электронное зажигание',
      'Защита от низкого уровня масла'
    ]
  },
  {
    name: 'Дизельный двигатель Yanmar L100N',
    image: '/images/motors/motor3.jpg',
    images: [
      '/images/motors/motor3_1.jpg',
      '/images/motors/motor3_2.jpg'
    ],
    description: 'Надежный одноцилиндровый дизельный двигатель воздушного охлаждения. Разработан для длительной непрерывной работы в тяжелых условиях эксплуатации.',
    brand: 'Yanmar',
    category: 'diesel',
    price: 89500,
    countInStock: 5,
    rating: 4.7,
    numReviews: 18,
    power: 10, // л.с.
    weight: 48,
    dimensions: {
      length: 487,
      width: 412,
      height: 528
    },
    rpm: 3600,
    efficiency: 94,
    fuelType: 'diesel',
    manufacturer: 'Yanmar Co., Ltd',
    yearOfManufacture: 2023,
    warranty: 24,
    features: [
      'Объем двигателя 435 см³',
      'Прямой впрыск топлива',
      'Воздушное охлаждение',
      'Декомпрессионный клапан',
      'Низкий уровень шума и вибраций',
      'Экономичное потребление топлива'
    ]
  },
  {
    name: 'Гидравлический мотор SMH250',
    image: '/images/motors/motor4.jpg',
    images: [
      '/images/motors/motor4_1.jpg'
    ],
    description: 'Гидравлический орбитальный мотор SMH250 с высоким крутящим моментом. Предназначен для использования в мобильной и промышленной гидравлике.',
    brand: 'Stauff',
    category: 'hydraulic',
    price: 35800,
    countInStock: 10,
    rating: 4.2,
    numReviews: 7,
    power: 25, // кВт
    weight: 15,
    dimensions: {
      length: 200,
      width: 180,
      height: 180
    },
    rpm: 1000,
    efficiency: 90,
    manufacturer: 'Stauff Hydraulics',
    yearOfManufacture: 2023,
    warranty: 18,
    features: [
      'Максимальный крутящий момент 450 Нм',
      'Рабочее давление до 250 бар',
      'Высокая надежность',
      'Компактные размеры',
      'Возможность реверсивной работы'
    ]
  },
  {
    name: 'Шаговый двигатель Nema 34',
    image: '/images/motors/motor5.jpg',
    images: [
      '/images/motors/motor5_1.jpg'
    ],
    description: 'Высокоточный шаговый двигатель Nema 34 с высоким крутящим моментом. Применяется в станках ЧПУ, 3D-принтерах, роботах и других устройствах, требующих точного позиционирования.',
    brand: 'Stepper Motor',
    category: 'electric',
    price: 8900,
    countInStock: 20,
    rating: 4.6,
    numReviews: 14,
    power: 1.2, // кВт
    weight: 4.2,
    dimensions: {
      length: 150,
      width: 86,
      height: 86
    },
    voltage: 48,
    rpm: 200,
    efficiency: 80,
    manufacturer: 'StepperTech Inc.',
    yearOfManufacture: 2023,
    warranty: 12,
    features: [
      'Угловой шаг 1.8°',
      'Двухфазный биполярный',
      'Крутящий момент 8.5 Нм',
      'Класс изоляции B',
      'Возможность микрошагового режима'
    ]
  },
  {
    name: 'Пневматический мотор P1V-S',
    image: '/images/motors/motor6.jpg',
    images: [
      '/images/motors/motor6_1.jpg'
    ],
    description: 'Компактный пневматический лопастной мотор P1V-S для промышленного применения. Подходит для работы во взрывоопасных средах.',
    brand: 'Parker',
    category: 'pneumatic',
    price: 28600,
    countInStock: 7,
    rating: 4.3,
    numReviews: 9,
    power: 2.5, // кВт
    weight: 5.8,
    dimensions: {
      length: 210,
      width: 120,
      height: 120
    },
    rpm: 3000,
    efficiency: 85,
    manufacturer: 'Parker Hannifin',
    yearOfManufacture: 2023,
    warranty: 12,
    features: [
      'Рабочее давление 6 бар',
      'Низкий уровень шума',
      'Взрывобезопасное исполнение',
      'Лопастная конструкция',
      'Встроенный глушитель'
    ]
  }
];

export default motors; 