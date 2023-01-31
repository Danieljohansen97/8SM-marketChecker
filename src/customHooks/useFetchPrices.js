import { useState, useEffect } from "react";

const useFetchPrices = (shoppingList, tradehub) => {
  const [fetchedItems, setFetchedItems] = useState([]);

  useEffect(() => {
    const handleFetchPrices = async () => {
      const promises = shoppingList.map((item) => {
        return fetch(
          `https://api.evemarketer.com/ec/marketstat/json?typeid=${item.typeId}${tradehub}`
        ).then((response) => {
          return response.json().then((data) => {
            let completeItem = {
              data,
              name: item.name,
              amount: item.amount,
            };
            return completeItem;
          });
        });
      });

      Promise.all(promises).then((results) => {
        const returnedItems = results.map((result) => result);
        setFetchedItems(returnedItems);
      });
    };

    handleFetchPrices();
  }, [shoppingList, tradehub]);

  return [fetchedItems, setFetchedItems];
};

export default useFetchPrices;