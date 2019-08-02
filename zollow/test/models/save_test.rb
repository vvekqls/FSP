# == Schema Information
#
# Table name: saves
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  property_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class SaveTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
