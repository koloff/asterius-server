#include <iostream>
#include <cstdio>
#include <cmath>

using namespace std;

const int MAX_E = 128, MAX_M = 128;

int n, m;
double a[MAX_E][MAX_M];
double b[MAX_M];

double Simplex_Table[MAX_M][MAX_E+MAX_M+1];

struct Simplex {

    double value;
    int pos;
};

Simplex s[MAX_M+1];
double x[MAX_E];

void read() {

    int i, j;

    scanf("%d%d", &n, &m);

    for(i=1; i<=n; i++) {
        for(j=1; j<=m; j++) {

            scanf("%lf", &a[i][j]);
        }
    }

    for(i=1; i<=m; i++) {

        scanf("%lf", &b[i]);
        b[i]*=100;
    }
}

void construct() {

    int i, j;

    for(i=1; i<=m; i++) {
        for(j=1; j<=n; j++) {

            Simplex_Table[i][j] = a[j][i];
        }
        Simplex_Table[i][n+i] = 1;
        s[i].value = b[i];
    }

    double percentage_sum;

    for(i=1; i<=n; i++) {

        percentage_sum = 0;

        for(j=1; j<=m; j++) {

            percentage_sum += Simplex_Table[j][i];
        }
        Simplex_Table[m+1][i] = -percentage_sum;
    }
    Simplex_Table[m+1][n+m+1] = 1;
    s[m+1].value = 0;
}

void simplex_process() {

    int i, j;

    double min_el = 0;
    int min_pos = 0;

    for(i=1; i<=n; i++) {

        if(Simplex_Table[m+1][i] < min_el) {

            min_el = Simplex_Table[m+1][i];
            min_pos = i;
        }
    }

    double pivot_el = 2000;
    int pivot_pos = 0;

    for(i=1; i<=m; i++) {

        if(Simplex_Table[i][min_pos] > 0 && (s[i].value / Simplex_Table[i][min_pos]) < pivot_el) {

            pivot_el = s[i].value / Simplex_Table[i][min_pos];
            pivot_pos = i;
        }
    }
    s[pivot_pos].pos = min_pos;

    double div = Simplex_Table[pivot_pos][min_pos];

    for(i=1; i<=n+m+1; i++) {

        Simplex_Table[pivot_pos][i] /= div;
    }
    s[pivot_pos].value /= div;

    double sub;

    for(i=1; i<=m+1; i++) {

        if(i == pivot_pos) continue;
        sub = Simplex_Table[i][min_pos];

        for(j=1; j<=n+m+1; j++) {

            Simplex_Table[i][j] -= sub*Simplex_Table[pivot_pos][j];
        }
        s[i].value -= sub*s[pivot_pos].value;
    }

    for(i=1; i<=n; i++) {
        if(Simplex_Table[m+1][i] < 0) {

            simplex_process();
            break;
        }
    }
}

void print() {

    int i;

    for(i=1; i<=m; i++) {
        if(s[i].pos) {

            x[s[i].pos] = s[i].value;
        }
    }

    for(i=1; i<=n; i++) {

        printf("%.0lf ", floor(x[i]));
    }
    printf("\n");
}

int main() {

    read();
    construct();
    simplex_process();
    print();

    return 0;
}
