import { useState } from "react";

export const useInfiniteScroll = () => {
    const [bottomOfPage, setBottomOfPage] = useState(false);
    window.onscroll = function(ev: any) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setBottomOfPage(true);
        } else {
            setBottomOfPage(false);
        }
    }

    return bottomOfPage;
}