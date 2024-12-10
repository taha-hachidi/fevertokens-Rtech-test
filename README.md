# fevertokens-Rtech-test
Task 1 :

npm install

react-native run-ios 
react-native run-android

Task 2:

with python 

for i in range(1, 101):
    affiche = False

    if i % 3 == 0:
        print("Hello", end='')
        affiche = True
    if i % 5 == 0:
        print("World", end='')
        affiche = True
    if i % 7 == 0:
        print("Yoo", end='')
        affiche = True
    if not affiche:
        print(i, end='')

    if i < 100:
        print(", ", end='')

print()


with Java:
public class Task2Algo {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            boolean affiche = false;

            if (i % 3 == 0) {
                System.out.print("Hello");
                affiche = true;
            }
            if (i % 5 == 0) {
                System.out.print("World");
                affiche = true;
            }
            if (i % 7 == 0) {
                System.out.print("Yoo");
                affiche = true;
            }
            if (!affiche) {
                System.out.print(i);
            }

            if (i < 100) {
                System.out.print(", ");
            }
        }

        System.out.println();
    }
}


Task 3:


I will alternate driving left and right along the highway, covering 2 kilometers in each direction, while scanning both sides for the red car. After marking the endpoint, I will return to the starting point and repeat the process, gradually extending the distance covered until I locate the car


# fevertokens-Rtech-test
