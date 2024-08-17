// src/hooks/useMenuItems.js
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";

const useMenuItems = () => {
    const { t } = useTranslation();

    return [
        {
            id: nanoid(),
            to: "/",
            text: t('Home'),
        },
        {
            id: nanoid(),
            to: "/books/:id",
            text: t('Book'),
        },
        {
            id: nanoid(),
            to: "/cart",
            text: t('Cart'),
        },
        {
            id: nanoid(),
            to: "/about",
            text: t('About'),
        },
    ];
};

export default useMenuItems;