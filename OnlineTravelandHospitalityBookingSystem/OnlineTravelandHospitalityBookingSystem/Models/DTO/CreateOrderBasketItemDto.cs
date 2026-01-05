public class CreateOrderBasketItemDto
{
    public Guid OrderBasketId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    
    public string Type { get; set; }
}