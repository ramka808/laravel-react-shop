<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
  use HasFactory;

  protected $fillable = ['product_name', 'rating', 'quantity', 'seller_id', 'category_id', 'type', 'sold'];

  public function seller()
  {
    return $this->belongsTo(User::class);
  }

  public function category()
  {
    return $this->belongsTo(Categories::class);
  }
  public function images()
  {
    return $this->hasMany(ProductsImages::class);
  }

  public function cartItem()
  {
    return $this->hasMany(CartItem::class);
  }
}
