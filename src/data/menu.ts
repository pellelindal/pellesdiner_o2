export type MenuSection = {
  title: string;
  items: string[];
};

export const menuData: MenuSection[] = [
  {
    title: 'Forretter',
    items: ['Lokringer', 'Cheesy fries', 'Hvitloksdip og brod'],
  },
  {
    title: 'Hovedretter',
    items: ['Entrecote og fries', 'Dagens fangst med fries', 'Hamburger med coleslaw og fries'],
  },
  {
    title: 'Dessert',
    items: ['Karamellpudding', 'Sjokoladekake', 'Pepperkake'],
  },
];
