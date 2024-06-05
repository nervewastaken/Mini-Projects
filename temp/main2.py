def longest_palindromic_substring(s):
    """
    Given a string s, returns the longest palindromic substring
    in s.
    """
    if len(s) == 0:
        return ""
    max_length = 1
    start = 0
    for i in range(1, len(s)):
        # Check for even length palindrome substring
        low = i - 1
        high = i
        while low >= 0 and high < len(s) and s[low] == s[high]:
            if high - low + 1 > max_length:
                start = low
                max_length = high - low + 1
            low -= 1
            high += 1

        # Check for odd length palindrome substring
        low = i - 1
        high = i + 1
        while low >= 0 and high < len(s) and s[low] == s[high]:
            if high - low + 1 > max_length:
                start = low
                max_length = high - low + 1
            low -= 1
            high += 1
    return s[start:start + max_length]

def check_substring():
    """
    Given two strings str1 and str2, and an integer k, returns
    'YES' if the length of the smallest substring in str1 that
    contains every character of str2 with the same number of
    occurrences or more is not less than k, and 'NO' otherwise.
    """
    str1, str2 = input().split()
    k = int(input())
    str1_ = longest_palindromic_substring(str1)
    str2_ = longest_palindromic_substring(str2)
    count_str2 = {}
    for char in str2_:
        if char in count_str2:
            count_str2[char] += 1
        else:
            count_str2[char] = 1

    for i in range(len(str1_)):
        count_str1 = {}
        for j in range(i, len(str1_)):
            if str1_[j] in count_str1:
                count_str1[str1_[j]] += 1
            else:
                count_str1[str1_[j]] = 1
            if count_str1 >= count_str2:
                return 'YES' if j - i + 1 >= k else 'NO'

    return 'NO'

# Test the function
print(check_substring())