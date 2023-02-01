// time complexity: O(n)
var sum_to_n_c = function (n) {
  if (n === 1) {
    return 1;
  }
  // recursive
  return n + sum_to_n_c(n - 1);
};
