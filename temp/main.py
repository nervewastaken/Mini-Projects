def longest_palindrome_substring(str):
  """
  Finds the longest palindromic substring within the given string.

  Args:
      str: The input string.

  Returns:
      The longest palindromic substring as a string.
  """

  n = len(str)

  # All substrings of length 1 are palindromes
  max_length = 1
  start = 0

  # Nested loop to mark start and end indices
  for i in range(n):
    for j in range(i, n):
      flag = 1

      # Check palindrome
      for k in range((j - i) // 2 + 1):
        if str[i + k] != str[j - k]:
          flag = 0
          break

      # Palindrome found
      if flag and (j - i + 1) > max_length:
        start = i
        max_length = j - i + 1

  return str[start:start + max_length]  # Return the actual substring

# Example usage
if __name__ == "__main__":
  str1, str2 = input().split()
  k = int(input())
  longest_palindrome1 = longest_palindrome_substring(str1)
  longest_palindrome2 = longest_palindrome_substring(str2)
  
  
  
  

