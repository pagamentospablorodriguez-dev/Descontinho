/*
# Tabela de produtos - Descontinho

1. Novas Tabelas
- `products`: catálogo de produtos com desconto de várias lojas
  - id (uuid, pk)
  - name (text) - nome do produto
  - description (text) - descrição
  - image_url (text) - URL da imagem
  - price (numeric) - preço atual com desconto
  - original_price (numeric) - preço original
  - discount_percent (numeric) - % de desconto calculado
  - store (text) - loja de origem (Amazon, Shopee, Mercado Livre, etc)
  - category (text) - categoria
  - affiliate_url (text) - link de afiliado
  - rating (numeric) - avaliação 0-5
  - reviews_count (int) - número de avaliações
  - is_featured (boolean) - destaque
  - created_at (timestamptz)

2. Segurança
- RLS habilitado
- App sem login: grants para anon + authenticated
- Dados públicos (catálogo de loja) - USING (true)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2) NOT NULL,
  discount_percent numeric(5,2) NOT NULL DEFAULT 0,
  store text NOT NULL DEFAULT 'Amazon',
  category text NOT NULL DEFAULT 'Geral',
  affiliate_url text NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 4.5,
  reviews_count integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON products TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_discount ON products(discount_percent DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
