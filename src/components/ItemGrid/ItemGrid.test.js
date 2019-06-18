import ItemGrid from "./ItemGrid";

test('Item Grid Orders Items', () => {
  let initialItems = [
    {_id: 1},
    {_id: 2},
    {_id: 3},
    {_id: 4},
    {_id: 5}
  ];
  let initialOrder = ItemGrid.getInitialOrder(initialItems);
  expect(initialOrder).toEqual([1,2,3,4,5]);
  let newItems = [
    {_id: 1},
    {_id: 3},
    {_id: 2},
    {_id: 800},
    {_id: 300},
  ];
  let orderedItems = ItemGrid.orderItems(newItems, initialOrder);
  console.log(orderedItems);
});