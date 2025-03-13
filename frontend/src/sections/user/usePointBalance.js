import React, { useEffect, useState } from 'react'

export const  usePointBalance = (list) => {
    const [pointBalance, setPointBalance] = useState(0)

    useEffect(() => {
        if (list && list.length > 0) {

            const total = list.reduce((a, b) => {
                if(b.status === "Aprovado") return a + (b.point_value || 0);
                return a
            }, 0)
            setPointBalance(total); 
        } else {
            setPointBalance(0); 
        }
    }, [list]);
  return {pointBalance}
}

