Product.destroy_all

130.times do
  Product.create!(name: Faker::Lorem.sentence(3,Faker::Config.locale = :en),
                  description: Faker::Lorem.sentence,
                  price: Faker::Number.between(1, 1412))
  Faker::Config.locale = 'ru'
end