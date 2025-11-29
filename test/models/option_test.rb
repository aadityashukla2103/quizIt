# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @option = build(:option)
  end

  def test_valid_option
    assert @option.valid?
  end

  def test_content_presence
    @option.content = ""
    assert_not @option.valid?
    assert_includes @option.errors[:content], "can't be blank"
  end

  def test_question_relation
    @option.question = nil
    assert_not @option.valid?
    assert_includes @option.errors[:question], "must exist"
  end

  def test_is_correct_boolean
    @option.is_correct = nil
    assert_not @option.valid?
  end
end
