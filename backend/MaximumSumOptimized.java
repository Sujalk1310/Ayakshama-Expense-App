import java.util.Scanner;

public class MaximumSumOptimized {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();

        for (int t = 0; t < T; t++) {
            int N = scanner.nextInt();
            int[] A = new int[N];

            for (int i = 0; i < N; i++) {
                A[i] = scanner.nextInt();
            }

            long maxSum = calculateMaxSum(N, A);

            System.out.println(maxSum);
        }

        scanner.close();
    }

    private static long calculateMaxSum(int N, int[] A) {
        long maxSum = Long.MIN_VALUE;
        long currentSum = 0;

        // Calculate the sum of all elements
        for (int i = 0; i < N; i++) {
            currentSum += A[i];
        }

        long prefixSum = 0;
        // Iterate through all possible partition points
        for (int i = 0; i < N; i++) {
            prefixSum += A[i];
            maxSum = Math.max(maxSum, prefixSum + currentSum);
            currentSum -= A[i];
        }

        return maxSum;
    }
}
