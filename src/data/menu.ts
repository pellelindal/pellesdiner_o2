export type MenuSection = {
  title: string;
  items: string[];
};

export const menuData: MenuSection[] = [
  {
    title: 'Forretter',
    items: ['Løkringer', 'Cheesy fries', 'Hvitløksdip og brød'],
  },
  {
    title: 'Hovedretter',
    items: ['Entrecôte og fries', 'Dagens fangst med fries', 'Hamburger med coleslaw og fries'],
  },
  {
    title: 'Dessert',
    items: ['Karamellpudding', 'Sjokoladekake', 'Pepperkake'],
  },
];
