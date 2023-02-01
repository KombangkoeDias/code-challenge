WITH usd_value AS (
  SELECT 
    address,
    SUM(CASE 
      WHEN denom = 'usdc' THEN amount * 0.000001 
      WHEN denom = 'swth' THEN amount * 0.00000005
      WHEN denom = 'tmz' THEN amount * 0.003 
    END) as usd_balance
  FROM balances
  GROUP BY address
)
SELECT 
  DISTINCT
  trades.address,
  usd_balance
FROM trades
JOIN usd_value ON trades.address = usd_value.address
WHERE trades.block_height > 730000 AND usd_balance >= 500
