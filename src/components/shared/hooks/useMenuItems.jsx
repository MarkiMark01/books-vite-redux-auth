import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/books/booksOperations";

const useMenuItems = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.books.cart);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  return [
    {
      id: nanoid(),
      to: "/",
      text: t("Home"),
    },
    {
      id: nanoid(),
      to: "/books/:id",
      text: t("Book"),
    },
    {
      id: nanoid(),
      to: "/cart",
      text: (
        <div style={{ position: 'relative', display: 'flex', 
        justifyContent:'center', alignItems:'center', marginTop: 3, marginRight: 2 }}>
          {t("Cart")}
          <span
            style={{
              position: "absolute",
              background: '#F43F5E',
              color: 'white',
              borderRadius: '50%',
              fontSize: 8,      
              top: '10px',        
              right: '-13px',      
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '10px',  
              height: '14px',     
            }}
          >
            {cart.length}
          </span>
        </div>
      ),
      
      
    },
    {
      id: nanoid(),
      to: "/about",
      text: t("About"),
    },
  ];
};

export default useMenuItems;
