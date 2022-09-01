class CreateCryptos < ActiveRecord::Migration[7.0]
  def change
    create_table :cryptos do |t|
      t.string :hash
      t.string :prev_block
      t.string :block_index
      t.string :time
      t.string :bits

      t.timestamps
    end
  end
end
