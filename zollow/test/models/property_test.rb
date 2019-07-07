# == Schema Information
#
# Table name: properties
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  beds       :integer          not null
#  baths      :integer          not null
#  price      :integer          not null
#  sale       :boolean          not null
#  rent       :boolean          not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class PropertyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
