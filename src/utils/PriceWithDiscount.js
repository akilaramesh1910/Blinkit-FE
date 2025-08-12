

const PriceWithDiscount = (price, dis = 1) => {
  const discountPrice = Math.ceil((Number(price) * Number(dis))/ 100)
  const finalPrice = Number(price) - discountPrice
  return finalPrice
}

export default PriceWithDiscount